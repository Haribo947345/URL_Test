import React, { useState } from 'react';

const URLHandler = () => {
  const [inputValue, setInputValue] = useState('');
  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    const validUrls = [];
    const invalidUrls = [];

    for (let i = 0; i < lines.length; i++) {
      const url = lines[i];

      if (isValidUrl(url)) {
        validUrls.push(url);
      } else {
        invalidUrls.push(url);
      }
    }

    if (invalidUrls.length > 0) {
      setErrorMessage('Error: ' + invalidUrls.join(', '));
    } else {
      setErrorMessage('');
      setUrlList((prevUrls) => [...prevUrls, ...validUrls]);
    }

    setInputValue('');
  };

  const handleOpenUrls = async () => {
    setIsLoading(true);
  
    for (const url of urlList) {
      const newWindow = window.open(url);
      
      // URL이 열린 후 1초(1000ms) 뒤에 창을 닫기
      setTimeout(() => {
        newWindow.close();
      }, 1000);
  
      // 1초(1000ms)씩 기다리기
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  
    setIsLoading(false);
  };

  return (
    <div>
      <textarea rows="8" cols="50" value={inputValue} onChange={handleInputChange} />
      <br />
      <button onClick={handleAddUrls}>네이버 검증 링크 추가하기</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>추가된 네이버 검증링크는 총: {urlList.length}개 입니당.</p>
      <ul>
        {urlList.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
      <button onClick={handleOpenUrls} disabled={isLoading}>
        {isLoading ? '자동으로 열리고 닫히는중..' : '모든URL 열어보기'}
      </button>
    </div>
  );
};

export default URLHandler;
