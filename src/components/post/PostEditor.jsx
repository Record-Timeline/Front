/** @jsxImportSource @emotion/react */

import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react'
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // react-quill과 css파일 import 하기
import {css} from "@emotion/react";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

function PostEditor({placeholder, htmlContent, setHtmlContent}) {
  const [values, setValues] = useState(htmlContent);
  const quillRef = useRef(null); // useRef로 ReactQuill 인스턴스에 접근

  // 기존 작성되었던 글 그대로 불러오기
  useEffect(() => {
    setValues(htmlContent);
  }, [htmlContent]);

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
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  }), []);

  return (
    <ReactQuill
      placeholder={placeholder}
      ref={quillRef} // ReactQuill 인스턴스를 참조
      theme="snow"
      modules={modules}
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