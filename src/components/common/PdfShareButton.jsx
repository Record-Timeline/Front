/** @jsxImportSource @emotion/react */

import React from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PdfButton({ targetId }) {
  // PDF 저장 기능
  const generatePDF = async () => {
    const timelineElement = document.querySelector("#timeline");
    const button = document.querySelector("#button");
    button.style.display = "none"; // 버튼 숨기기

    // HTML 요소의 실제 크기 계산
    const canvas = await html2canvas(timelineElement, { scale: 3 });

    const imageData = canvas.toDataURL("image/png");

    // PDF 설정 (A4 비율)
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // 여백 설정
    const marginTop = 10;
    const marginBottom = 10;
    const marginLeft = -50;
    const marginRight = -50;

    // 이미지의 실제 크기 계산 (픽셀 단위에서 밀리미터 단위로 변환)
    const imgProps = pdf.getImageProperties(imageData);
    const imgWidth = pageWidth - marginLeft - marginRight; // 페이지 너비에 맞게 이미지 크기 조정
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = marginTop; // 첫 페이지에서 위 여백 적용

    // 첫 페이지에 이미지 추가
    pdf.addImage(imageData, "PNG", marginLeft, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - marginTop - marginBottom;

    // 페이지를 넘기면서 이미지 추가
    while (heightLeft > 0) {
      position = -heightLeft + marginTop; // 새로운 페이지의 시작 위치에서 여백만큼 띄움
      pdf.addPage();
      pdf.addImage(imageData, "PNG", marginLeft, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - marginTop - marginBottom; // 남은 이미지 높이 업데이트
    }

    // PDF 저장
    pdf.save("timeline.pdf");
    button.style.display = "flex"; // 버튼 다시 표시
  };

  return (
    <div
      id="pdfButton"
      css={{
        color: '#787878',
        display: "flex",
        alignItems: 'center',
        position: "absolute",
        right: "40px",
        cursor: "pointer",
      }}
      onClick={generatePDF}
    >
      <IosShareIcon />
      <div
        css={{
          color: '#757575',
          fontSize: '16px',
          marginTop: '2px',
          marginLeft: '4px',
          width: 'fit-content'
        }}
      >
        pdf 공유
      </div>
    </div>
  );
}
