function Node(value) {
    this.height = 1; //节点的高度
    this.value = value; //节点的值
    this.left = null; //左孩子
    this.right = null; //右孩子

    this.width = 0; //画图时预留的宽度
    this.offset = 0;
    this.color = 'white';
}

//返回节点高度
function getHeight(node) {
    return node ? node.height : 0;
}

//返回节点宽度
function getWidth(node) {
    return node ? node.width : 0;
}


//根据输入的数字建立各个节点
function createNodes(nums, index, node, start, end, first = false, insert = false, insertnum = 0) {

    if (start == end) //start==end时表示当前节点已经建立了
        return;
    let mid = Math.floor((end - start) / 2) + start; //中间节点
    let leftIndex = Math.floor(Math.abs((mid - 1 - start) / 2)) + start; //左孩子下标
    let rightIndex = Math.floor(Math.abs((end - mid - 1) / 2)) + mid + 1; //右孩子下标

    if (leftIndex != mid) {
        let lcvalue = parseInt(nums[leftIndex]);
        if (!isNaN(lcvalue)) {
            let left = new Node(lcvalue);
            node.left = left;
            if (insert && first && lcvalue == insertnum) {
                first = false;
                node.left.color = 'red';
            }
            createNodes(nums, leftIndex, left, start, mid - 1, first, insert, insertnum); //递归调用本函数，直到建立整棵树
        }
    }

    if (rightIndex != mid) {
        let rcvalue = parseInt(nums[rightIndex]);
        if (!isNaN(rcvalue)) {
            let right = new Node(rcvalue);
            node.right = right;
            if (insert && first && rcvalue == insertnum) {
                first = false;
                node.right.color = 'red';
            }
            createNodes(nums, rightIndex, right, mid + 1, end, first, insert, insertnum); //递归调用本函数，直到建立整棵树
        }
    }


    let leftHeight = (node.left == null) ? 0 : node.left.height;
    let rightHeight = (node.right == null) ? 0 : node.right.height;

    node.height = (rightHeight > leftHeight) ? rightHeight + 1 : leftHeight + 1;
    //当前节点的高度为左节点和右节点更高的那个+1
}