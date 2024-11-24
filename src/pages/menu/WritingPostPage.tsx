import React, { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Posting } from 'types/posting';
import 'react-quill/dist/quill.snow.css';
import { postPosting } from 'utils/postPosting';
import { ImageResize } from 'quill-image-resize-module-ts';

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
  const navigate = useNavigate();

  const onClickSubmit = () => {
    postPosting(title, content, state.boardType.code, price).then((result) => {
      navigate(`/posting-detail/${result.id}`, {
        state: { boardType: state.boardType.name, posting: result }
      });
    });
  };

  useEffect(() => {
    console.log(content);
  }, [content]);
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
