/**
 * This module provides functions to change the content of the info sidebar
 */

export {updateForestAndTreeInfo, treeMouseover, branchMouseover, leafMouseover, mouseout};

const $forest = $("#forest-info");
const $hover = $("#hover-info");

function updateForestAndTreeInfo(forest, treeId) {
    $hover.empty();
    $forest.empty();
    $forest.append(forestAndTreeTemplate(forest, treeId));
    $forest.show();
}

function treeMouseover(tree) {
    $forest.hide(0);
    $hover.append(treeTemplate(tree));
}

function branchMouseover(branch) {
    $forest.hide(0);
    $hover.append(branchTemplate(branch));
}

function leafMouseover(leaf) {
    $forest.hide(0);
    $hover.append(leafTemplate(leaf));
}

function mouseout() {
    $hover.empty();
    $forest.show();
}

function forestAndTreeTemplate(forest, treeId) {
    return `<table class="table is-fullwidth">
        <tr>
          <td>Forest Strength</td>
          <td>${forest.strength}</td>
        </tr>
        <tr>
          <td>Number of Trees</td>
          <td>${forest.trees.length}</td>
        </tr>
        <tr>
          <td style="border: 0; padding-bottom: 30px;">Number of Samples</td>
          <td style="border: 0; padding-bottom: 30px;">${forest.totalSamples}</td>
        </tr>
        <tr>
          <td>Tree</td>
          <td>#${treeId + 1}</td>
        </tr>
        <tr>
          <td>Tree Strength</td>
          <td>${forest.trees[treeId].strength}</td>
        </tr>
    </table>`;
}

function treeTemplate(tree) {
    return `<table class="table is-fullwidth">
        <tr>
          <td style="font-weight: bold">Tree</td>
          <td></td>
        </tr>
        <tr>
          <td>Tree</td>
          <td>#${tree.id}</td>
        </tr>
        <tr>
          <td>Tree Strength</td>
          <td>${tree.strength}</td>
        </tr>
    </table>`;
}

function branchTemplate(branch) {
    return `<table class="table is-fullwidth">
        <tr>
          <td style="font-weight: bold">Branch</td>
          <td></td>
        </tr>
        <tr>
          <td>Height</td>
          <td>${branch.height}</td>
        </tr>
        <tr>
          <td>Impurity</td>
          <td>${branch.impurity}</td>
        </tr>
        <tr>
          <td>Drop of Impurity</td>
          <td>${branch.impurityDrop}</td>
        </tr>
        <tr>
          <td>Number of Samples</td>
          <td>${branch.samples}</td>
        </tr>
    </table>`;
}

function leafTemplate(leaf) {
    const classNames = leaf.classes.reduce((accumulator, current) => {
        return accumulator + `<td>${current.name}</td>`
    }, "");
    const classFreq = leaf.classes.reduce((accumulator, current) => {
        return accumulator + `<td>${current.count}</td>`
    }, "");
    const classColors = leaf.classes.reduce((accumulator, current) => {
        return accumulator + `<td><div style="background: rgb(${current.color}); width: 15px; height: 10px;"></div></td>`
    }, "");
    return `
    <table class="table is-fullwidth">
        <tr>
          <td style="font-weight: bold">Leaf</td>
          <td>#${leaf.leafId}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>${leaf.height}</td>
        </tr>
        <tr>
          <td>Impurity</td>
          <td>${leaf.impurity}</td>
        </tr>
    </table>
    <table class="table is-fullwidth">
        <tr style="text-transform: uppercase; font-size: 12px">
          ${classNames}
        </tr>
        <tr style="font-size: 12px">
          ${classFreq}
        </tr>
        <tr>
          ${classColors}
        </tr>
    </table>`;
}