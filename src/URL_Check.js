import React, { useState } from 'react';

const URLHandler = () => {
  const [inputValue, setInputValue] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUrlListOpen, setIsUrlListOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const urlWithoutProtocolPattern = /^[^\s/$.?#].[^\s]*$/i;

    return urlPattern.test(url) || urlWithoutProtocolPattern.test(url);
  };

  const handleAddUrls = () => {
    const lines = inputValue.split('\n').map((line) => line.trim()).filter(Boolean);
    const validUrls = lines.filter(isValidUrl);
    const invalidUrls = lines.filter((url) => !isValidUrl(url));

    if (invalidUrls.length > 0) {
      setErrorMessage('Invalid URLs: ' + invalidUrls.join(', '));
    } else {
      setErrorMessage('');
      setUrlList((prevUrls) => [...prevUrls, ...validUrls]);
      setIsUrlListOpen(true);
    }

    setInputValue('');
  };

  const handleRemoveUrl = (index) => {
    setUrlList((prevUrls) => {
      const updatedUrls = [...prevUrls];
      updatedUrls.splice(index, 1);
      return updatedUrls;
    });
  };

  const handleRemoveAllUrls = () => {
    setUrlList([]);
    setIsUrlListOpen(false);
  };

  const handleOpenUrls = () => {
    setIsLoading(true);
  
    for (const url of urlList) {
      window.open(url);
    }
  
    setIsLoading(false);
  };



  return (
    <div>
      <h1>사용시 주의사항</h1>
      <h3>혹시나 사용하다 멈춤현상이 발생되면 컨트롤+탭 키를 한번만 눌러주세요</h3>
      <h3 style={{color: 'red'}}>*URL만 복사해서 값을 넣어주세요.*</h3>
      <h2 style={{ color: 'red'}}>공백은 상관없지만 구분, 프로토콜, 도메인, 하이픈은 왠만하면 넣지 않도록 주의해주세요.</h2>
      <p>마지막 패치버전 24.02.07ver 코드 최적화 및 리스트 숨김&표시 버튼 추가</p>
      <textarea rows="8" cols="50" value={inputValue} onChange={handleInputChange} />
      <br />
      <button onClick={handleAddUrls} style={{marginRight: 10}}>네이버 검증 링크 추가하기</button>
      <button onClick={handleRemoveAllUrls} style={{marginRight: 10}}>검증 링크 모두 삭제하기</button>
      <button onClick={handleOpenUrls} disabled={isLoading}>
        {isLoading ? '자동으로 열리고 닫히는중..' : '모든URL 열어보기'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>추가된 네이버 검증링크는 총: {urlList.length}개 입니당. 준비가 됬다면 위에 모든URL 열어보기 버튼을 눌러주세요!</p>
      {urlList.length > 0 && (
        <>
          <button onClick={() => setIsUrlListOpen(!isUrlListOpen)}>
            {isUrlListOpen ? 'URL 목록 닫기' : 'URL 목록 열기'}
          </button>
          {isUrlListOpen && (
            <ul>
              {urlList.map((url, index) => (
                <li key={index}>
                  <button onClick={() => handleRemoveUrl(index)}>삭제</button>
                  {url}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default URLHandler;
