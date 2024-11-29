import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { postPosting } from 'utils/menu/postPosting';
import { ImageResize } from 'quill-image-resize-module-ts';
import imageCompression from 'browser-image-compression';
import { dataURLToFile } from 'utils/dataURLToFile';
import { fileToDataURL } from 'utils/fileToDataURL';
import Loading from 'components/common/Loading';
import { marketModules, modules } from 'constants/quillModules';

Quill.register('modules/ImageResize', ImageResize);

export default function WritingPostPage() {
  const location = useLocation();
  const state = location.state as {
    boardType: string;
    pageName: string;
  };
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [isContentUpdated, setIsContentUpdated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgFiles, setImgFiles] = useState<(File | null)[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const imgFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(imgFiles.filter((item) => item != null));
  }, [imgFiles]);

  async function compressAndConvertToDataURL(file: File): Promise<string> {
    const options = {
      maxSizeMB: 0.4, // 최대 크기 .4MB로 압축
      maxWidthOrHeight: 400, // 최대 가로/세로 400px
      useWebWorker: true, // Web Worker 사용?
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

  const onSaveImage = (index: number, file: File) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // 이미지 파일 배열 업데이트
        setImgFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          // + 버튼을 누른 순간 null로 자리가 이미 존재
          // 따라서 사진을 추가할 자리의 index를 가져가자!
          updatedFiles[index] = file;
          return updatedFiles;
        });

        // 미리보기 배열 업데이트
        setPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = reader.result as string;
          return updatedPreviews;
        });
      };
    }
  };

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
        setLoading(true);
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
        } finally {
          setLoading(false);
        }
      }
    }

    // 업데이트된 content를 상태에 저장

    setContent(updatedContent);
    setIsContentUpdated(true);
  };

  useEffect(() => {
    const newImgFiles = imgFiles.filter((item) => item != null) as File[];
    if (isContentUpdated) {
      postPosting(title, content, state.boardType, price, newImgFiles).then(
        (result) => {
          navigate(`/posting-detail/${result.id}`, {
            replace: true,
            state: {
              boardType: state.boardType,
              pageName: state.pageName,
              posting: result
            }
          });
        }
      );
      setIsContentUpdated(false); // 플래그 초기화
    }
  }, [isContentUpdated]);

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onSaveImage(index, file);
    }
  };

  const addNewImageSlot = () => {
    setImgFiles((prevFiles) => [...prevFiles, null]);
    setPreviews((prevPreviews) => [...prevPreviews, '']);
  };

  return (
    <WritingPostPageContainer>
      <PageNameBox>
        <p>{state.pageName}</p>
      </PageNameBox>

      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <TitleBox>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Please write title"
            />
          </TitleBox>

          <PriceSettingBox>
            <span>Price</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="&#8361;"
            />
            <ExchangeBox>
              exchange
              <div>
                <Search></Search>
                <CountryList></CountryList>
              </div>
            </ExchangeBox>
          </PriceSettingBox>

          <ImgBox>
            {previews.map((preview, index) => (
              <div key={index}>
                {preview ? (
                  <img src={preview} alt={`preview-${index}`} />
                ) : (
                  <label htmlFor={`file-${index}`}>
                    <EachImage>+</EachImage>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id={`file-${index}`}
                  ref={imgFileRef}
                  onChange={(e) => handleFileChange(e, index)}
                  style={{ display: 'none' }}
                />
              </div>
            ))}
          </ImgBox>
          <AddImageButton onClick={addNewImageSlot}>Add Images</AddImageButton>

          <CustomReactQuill
            $boardType={state.boardType}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={state.boardType === 'market' ? marketModules : modules}
            placeholder="Please write content"
          />

          <SubmitButtonWrapper>
            <SubmitButton onClick={onClickSubmit}>Submit</SubmitButton>
          </SubmitButtonWrapper>
        </>
      )}
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

const CustomReactQuill = styled(ReactQuill)<{ $boardType: string }>`
  margin-top: ${(props) =>
    props.$boardType === 'market' ? '1.75rem' : '3.5rem'};
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

const PriceSettingBox = styled.div`
  display: flex;
  margin-top: 1.75rem;
  align-items: center;
  > span {
    font-family: Inter;
    font-size: 2.7rem;
    margin-right: 1rem;
  }

  > input {
    padding: 0.5rem;
    width: 30%;
    margin-right: 1rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ExchangeBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background: rgba(255, 255, 255, 0.84);
  width: 10rem;
  height: 3rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Search = styled.div``;

const CountryList = styled.div``;

const ImgBox = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 시 */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(178, 31, 124, 0.7);
  }

  > div {
    > img {
      object-fit: cover;
      width: 12rem;
      height: 12rem;
    }
  }
`;

const EachImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  background: var(--main-gray);
  &:hover {
    background: rgba(217, 217, 217, 0.7);
  }
  width: 12rem;
  height: 12rem;
  margin-bottom: 0.5rem;
`;

const AddImageButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
`;
