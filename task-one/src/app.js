import FileTree from './fileTree';

export function createFileTree(input) {
  const fileTree = new FileTree();

  const sortedInput =  input.sort((a, b) => a.id - b.id)

  sortedInput[0].parentId = null;

  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}