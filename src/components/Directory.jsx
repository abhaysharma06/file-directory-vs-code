import React, { useState } from "react";
import "../styles.css";
const Directory = ({ folderStructureData, handleInsertNode }) => {
  const [openDirectory, setOpenDirectory] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setOpenDirectory(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const addNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(
        folderStructureData.id,
        e.target.value,
        showInput.isFolder
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (folderStructureData?.isFolder) {
    return (
      <div style={{ margin: "7px" }}>
        <div
          className="folder"
          onClick={() => {
            setOpenDirectory(!openDirectory);
          }}
        >
          <span>📁 {folderStructureData?.name}</span>

          <div className="">
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>
        <div
          style={{
            display: openDirectory ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput?.isFolder ? "📁" : "📄"}</span>
              <input
                className="inputContainer__input"
                autoFocus
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={addNewFolder}
              />
            </div>
          )}
          {folderStructureData?.items?.map((data, i) => {
            return (
              <Directory
                handleInsertNode={handleInsertNode}
                key={data.id}
                folderStructureData={data}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {folderStructureData?.name}</span>;
  }
};

export default Directory;
