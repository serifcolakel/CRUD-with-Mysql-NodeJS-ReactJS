import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
export default function CustomEditor({ data, setData }) {
  console.log("data", data);
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
      console.log("editor loader", loader);
      return uploadAdapter(loader);
    };
  }
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
      <CKEditor
        editor={ClassicEditor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data={data}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
          //console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          //console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //console.log("Focus.", editor);
        }}
      />
    </div>
  );
}
