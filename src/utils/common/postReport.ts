import { instance } from 'api/instance';
import { AxiosError } from 'axios';

export const postReport = async (
  content_type: string,
  object_id: string,
  report_type: string,
  reason: string,
  setOpenReport: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const accessToken = localStorage.getItem('accessToken');

  const formData = new FormData();
  formData.append('content_type', content_type);
  formData.append('object_id', object_id);
  formData.append('report_type', report_type);
  formData.append('reason', reason);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'multipart/form-data'
  };

  try {
    const response = await instance.post(
      '/admin-api/report/request',
      formData,
      { headers }
    );

    if (response.status === 201) {
      alert('Report submitted successfully.');
      setOpenReport(false);
    }
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.data && typeof error.response.data === 'object') {
      // 데이터 구조를 명시적으로 선언
      const errorMessage = error.response.data as {
        non_field_errors?: string[];
        reason?: string[];
        report_type?: string[];
      };

      // 조건에 따라 에러 메시지 처리
      if (
        errorMessage.report_type?.[0] ===
        `""이 유효하지 않은 선택(choice)입니다.`
      ) {
        alert('Invalid choice for report type.');
      } else if (
        errorMessage.reason?.[0] === '이 필드는 blank일 수 없습니다.'
      ) {
        alert('Please fill the form');
      } else if (
        errorMessage.non_field_errors?.[0] === '이미 신고한 컨텐츠입니다.'
      ) {
        alert('Already reported.');
        setOpenReport(false);
      } else {
        alert('An unknown error occurred.');
        console.error(error.response.data);
      }
    } else {
      // 예기치 않은 에러 처리
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    }
  } finally {
  }
};
