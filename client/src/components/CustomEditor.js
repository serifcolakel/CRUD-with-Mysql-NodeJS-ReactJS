import React, { createRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

import axios from "axios";
export default function CustomEditor({ data, setData }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("image", file);
            axios
              .post("http://localhost:5000/api/image/user", body, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${localStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                resolve({
                  default: `http://localhost:5000/images/user/${res.data.image}`,
                });
              });
          });
        });
      },
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  const toolBarRef = createRef();
  const style = {
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      margin: "20px !important",
      backgroundColor: "#f5f5f5",
    },
    col: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  };
  return (
    <div className={style.row}>
      <h2
        style={{
          textAlign: "center",
          margin: "20px",
          fontSize: "20px",
          color: "#fff",
        }}
      >
        Using CKEditor 5 build in React
      </h2>
      <div id="toolbar-container"></div>

      <div>
        <div ref={toolBarRef} />
        <CKEditor
          editor={DecoupledEditor}
          data={data}
          config={{
            image: {
              resizeUnit: "%",
              resizeOption: [
                {
                  name: "resizeImage:original",
                  label: "Original",
                  value: null,
                },
                {
                  name: "resizeImage:25",
                  label: "25%",
                  value: "25",
                },
                {
                  name: "resizeImage:50",
                  label: "50%",
                  value: "50",
                },
                {
                  name: "resizeImage:75",
                  label: "75%",
                  value: "75",
                },
                {
                  name: "resizeImage:100",
                  label: "100%",
                  value: "100",
                },
              ],
              toolbar: [
                "imageResize",
                "|",
                "imageStyle:full",
                "imageStyle:wrapText",
                "imageStyle:breakText",
                "imageStyle:inline",
                "imageStyle:block",
                "|",
                "toggleImageCaption",
                "imageTextAlternative",
              ],
            },
            extraPlugins: [uploadPlugin],
          }}
          onReady={(editor) => {
            if (toolBarRef.current) {
              toolBarRef.current.appendChild(editor.ui.view.toolbar.element);
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
          onBlur={(event, editor) => {
            //console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            //console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}
