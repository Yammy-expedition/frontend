import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import 'react-quill/dist/quill.snow.css';
import { postPosting } from 'utils/postPosting';
import { ImageResize } from 'quill-image-resize-module-ts';
import imageCompression from 'browser-image-compression';
import { dataURLToFile } from 'utils/dataURLToFile';
import { fileToDataURL } from 'utils/fileToDataURL';

Quill.register('modules/ImageResize', ImageResize);

export default function WritingPostPage() {
  const location = useLocation();
  const state = location.state as {
    boardType: { name: string; code: string };
    posting: Posting;
  };
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isContentUpdated, setIsContentUpdated] = useState<boolean>(false);
  const navigate = useNavigate();

  async function compressAndConvertToDataURL(file: File): Promise<string> {
    const options = {
      maxSizeMB: 0.4, // 최대 크기 1MB로 압축
      maxWidthOrHeight: 400, // 최대 가로/세로 1920px
      useWebWorker: true, // Web Worker 사용
      initialQuality: 1
    };

    try {
      // 이미지 압축
      const compressedFile = await imageCompression(file, options);
      console.log('압축 완료:', compressedFile);

      // 압축된 파일을 Data URL로 변환
      const dataURL = await fileToDataURL(compressedFile);
      console.log('데이터 URL:', dataURL);

      return dataURL;
    } catch (error) {
      console.error('압축 또는 변환 중 오류 발생:', error);
      throw error;
    }
  }

  const onClickSubmit = async () => {
    const srcArray: string[] = [];
    const gainSource = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g;

    while (gainSource.test(content)) {
      const result = RegExp.$2; // src 속성 값 추출
      srcArray.push(result);
    }

    let updatedContent = content; // content 상태 복사

    for (let i = 0; i < srcArray.length; i++) {
      const originalSrc = srcArray[i];
      console.log('원본 src:', originalSrc);

      if (originalSrc.startsWith('data:')) {
        // src가 데이터 URL인 경우에만 처리
        try {
          const file = await dataURLToFile(originalSrc, 'image.png'); // 데이터 URL을 파일로 변환
          const compressedDataURL = await compressAndConvertToDataURL(file); // 압축 후 데이터 URL로 변환

          // 원본 src를 압축된 데이터 URL로 교체
          updatedContent = updatedContent.replace(
            originalSrc,
            compressedDataURL
          );
          console.log('교체된 src:', compressedDataURL);
        } catch (error) {
          console.error('이미지 압축 또는 변환 중 오류:', error);
        }
      }
    }

    // 업데이트된 content를 상태에 저장

    setContent(updatedContent);
    setIsContentUpdated(true);
  };

  useEffect(() => {
    if (isContentUpdated) {
      postPosting(title, content, state.boardType.code, price).then(
        (result) => {
          navigate(`/posting-detail/${result.id}`, {
            state: { boardType: state.boardType.name, posting: result }
          });
        }
      );
      setIsContentUpdated(false); // 플래그 초기화
    }
  }, [isContentUpdated]);

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // 헤더
      [{ align: [] }], // 정렬
      ['bold', 'italic', 'underline', 'strike'], // 텍스트 포맷
      [{ list: 'ordered' }, { list: 'bullet' }], // 리스트
      ['blockquote', 'code-block'], // 인용구, 코드 블록
      [{ color: [] }, { background: [] }], // 텍스트 색상, 배경색
      ['link', 'image'], // 링크, 이미지, 비디오
      ['clean'] // 포맷 초기화
    ],
    ImageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };

  return (
    <WritingPostPageContainer>
      <PageNameBox>
        <p>{state.boardType.name}</p>
      </PageNameBox>

      <TitleBox>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please write title"
        />
      </TitleBox>

      <CustomReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        placeholder="Please write content"
      />

      <SubmitButtonWrapper>
        <SubmitButton onClick={onClickSubmit}>Submit</SubmitButton>
      </SubmitButtonWrapper>
    </WritingPostPageContainer>
  );
}

const WritingPostPageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 6.5rem 4.5rem;
`;

const PageNameBox = styled.div`
  > p {
    font-family: var(--sub-font);
    color: var(--primary-color);
    font-weight: 600;
    font-size: 5rem;
  }
`;

const CustomReactQuill = styled(ReactQuill)`
  margin-top: 3.5rem;
  & .ql-editor {
    font-family: inherit;
    font-size: inherit;
  }

  & .ql-editor strong {
    font-weight: bold;
  }

  & .ql-editor em {
    font-style: italic;
  }

  & .ql-editor u {
    text-decoration: underline;
  }

  & .ql-container,
  .ql-toolbar {
    background: #fff;
  }

  & .ql-container {
    min-height: 26rem;
  }
`;

const TitleBox = styled.div`
  margin-top: 5rem;
  > input {
    font-size: 2.5rem;
    width: 100%;
    height: 5rem;
    padding: 1.3rem;
  }
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: end;
`;

const SubmitButton = styled.button`
  width: 12rem;
  height: 5rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d6d6d6;
  background: var(
    --vertical-gradient,
    linear-gradient(180deg, #b21f7c 22.5%, #4c0d0f 100%)
  );
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;
