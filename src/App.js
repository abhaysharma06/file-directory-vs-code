import { useState, useEffect } from "react";
import "./App.css";
import Directory from "./components/Directory";
import folderData from "./data/folderData.js";
import useTraverseTree from "./hooks/useTraverseTree.js";

function App() {
  const [folderStructureData, setFolderStructureData] = useState();

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(folderStructureData, folderId, item, isFolder);
    setFolderStructureData(finalTree);
  };

  useEffect(() => {
    setFolderStructureData(folderData);
  }, []);

  return (
    <div className="App">
      <Directory
        handleInsertNode={handleInsertNode}
        folderStructureData={folderStructureData}
      />
    </div>
  );
}

export default App;
