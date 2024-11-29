import { Quill } from 'react-quill-new';

export const modules = {
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
