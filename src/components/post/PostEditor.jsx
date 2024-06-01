/** @jsxImportSource @emotion/react */

import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // react-quill과 css파일 import 하기
import {css} from "@emotion/react";

const formats = [
  'font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'align', 'color', 'background', 'size', 'h1',
];

function PostEditor({placeholder, htmlContent, setHtmlContent}) {
  const [values, setValues] = useState(htmlContent);
  const quillRef = useRef(null); // useRef로 ReactQuill 인스턴스에 접근

  // 기존 작성되었던 글 그대로 불러오기
  useEffect(() => {
    setValues(htmlContent);
  }, [htmlContent]);

  // 툴바의 사진 아이콘 클릭시 기존에 작동하던 방식 대신에 실행시킬 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement("input"); // input 태그를 동적으로 생성
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
    // input.setAttribute("name", "image");
    input.click();

    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
      const file = input.files[0];
      console.log("Selected file:", file); // 파일이 제대로 선택되었는지 확인
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const base64 = reader.result;
          console.log("Base64 string:", base64); // base64 인코딩이 제대로 되었는지 확인

          const quill = quillRef.current.getEditor();
          console.log("Quill editor instance:", quill); // quill 인스턴스 확인

          const range = quill.getSelection()?.index;
          console.log("Selection range:", range); // 현재 커서 위치 확인
          if (typeof range !== "number") return;

          // 이미지를 삽입할 위치로 이동
          quill.insertEmbed(range, 'image', base64);
          console.log("Image inserted at range:", range); // 이미지 삽입 확인
          quill.setSelection(range + 1); // 커서 위치를 이미지 뒤로 이동

          // 에디터의 내용을 다시 가져와 content를 업데이트 (image)
          const editorContent = quill.root.innerHTML;
          setHtmlContent(editorContent);
        };
        reader.readAsDataURL(file);
      }
    };
  }, [setHtmlContent]);

//   input.onchange = () => {
//     const file = input.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64 = reader.result;
//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection().index;
//         quill.insertEmbed(range, 'image', base64);
//         quill.setSelection(range + 1);
//         // 에디터의 내용을 다시 가져와 content를 업데이트
//         const editorContent = quill.root.innerHTML;
//         setHtmlContent(editorContent);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
// }, [setHtmlContent]);

  const modules = useMemo(() => ({
    toolbar: { // 툴바 옵션들
      container: [
        [{size: ['small', false, 'large', 'huge']}],
        [{align: []}],
        ['bold', 'italic', 'underline', 'strike'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{color: []}, {background: []}],
        ["image", "video"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  return (
    <ReactQuill
      placeholder={placeholder}
      ref={quillRef} // ReactQuill 인스턴스를 참조
      theme="snow"
      modules={modules}
      formats={formats}
      value={values}
      onChange={(content) => {
        console.log(content);
        setValues(content);
        setHtmlContent(content); // 부모 컴포넌트로 글 내용을 전달
      }}
      css={css({
        height: '496px',
        margin: "0 28px",
      })}
    />
  )
}

export default PostEditor;