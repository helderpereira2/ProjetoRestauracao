import { Typography } from "@material-ui/core";
import React from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ classes, onDrop, accept, style }) => {
  const { getRootProps, getInputProps, isDragActive, rejectedFiles } = useDropzone({
    onDrop,
    accept
  });

  return (
    <div style={style} {...getRootProps()}>

      <input  {...getInputProps()} />
      <div style={{ height: "100%" }} className="text-center">
        {!rejectedFiles || rejectedFiles.length === 0 ?
          isDragActive ? (
            <div style={{ height: "100%" }} className={classes.dropzoneActive}>
              <div style={{ height: "48%" }}></div>
              <Typography variant="h3">
                <b>Arraste</b> os <b>ficheiros</b> para aqui
              </Typography>
            </div>
          ) : (
            <div style={{ height: "100%" }} className={classes.dropzone}>
              <div style={{ height: "48%" }}></div>
              <Typography variant="h3">
                <b>Clique</b> ou <b>Arraste</b> os ficheiros
              </Typography>
            </div>
          ) : isDragActive ? (
            <div style={{ height: "100%" }} className={classes.dropzoneErrorActive}>
              <div style={{ height: "30%" }}></div>
              <Typography variant="h3">
                <b>Estes ficheiros não foram carregados com sucesso:</b>
              </Typography>
              {rejectedFiles.map(file => {
                return <p key={file.name}>{file.name}</p>
              })}
              <Typography variant="h3">
                <b>Arraste</b> os <b>ficheiros</b> para aqui
              </Typography>
            </div>
          ) : (
            <div style={{ height: "100%" }} className={classes.dropzoneError}>
              <div style={{ height: "30%" }}></div>
              <b>These files were not successfully loaded:</b>
              {rejectedFiles.map(file => {
                return <p key={file.name}>{file.name}</p>
              })}
              <Typography variant="h3">
                <b>Clique</b> ou <b>Arraste</b> os ficheiros
              </Typography>
            </div>
          )}
      </div >
    </div >
  )
};



export default Dropzone;