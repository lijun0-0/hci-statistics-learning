function renderSplitLayout(block, blockIndex) {
  function renderColumn(blocks, columnName) {
    return blocks.map(function (childBlock, childIndex) {
      return renderBlock(childBlock, `${blockIndex}-${columnName}-${childIndex}`);
    }).join("");
  }

  return `
    <div class="split-layout">
      <div class="split-panel">${renderColumn(block.left, "left")}</div>
      <div class="split-panel">${renderColumn(block.right, "right")}</div>
    </div>
  `;
}

registerBlockRenderer("splitLayout", renderSplitLayout);