function Node(value) {
    this.height = 1; //�ڵ�ĸ߶�
    this.value = value; //�ڵ��ֵ
    this.left = null; //����
    this.right = null; //�Һ���

    this.width = 0; //��ͼʱԤ���Ŀ��
    this.offset = 0;
    this.color = 'white';
}

//���ؽڵ�߶�
function getHeight(node) {
    return node ? node.height : 0;
}

//���ؽڵ���
function getWidth(node) {
    return node ? node.width : 0;
}


//������������ֽ��������ڵ�
function createNodes(nums, index, node, start, end, first = false, insert = false, insertnum = 0) {

    if (start == end) //start==endʱ��ʾ��ǰ�ڵ��Ѿ�������
        return;
    let mid = Math.floor((end - start) / 2) + start; //�м�ڵ�
    let leftIndex = Math.floor(Math.abs((mid - 1 - start) / 2)) + start; //�����±�
    let rightIndex = Math.floor(Math.abs((end - mid - 1) / 2)) + mid + 1; //�Һ����±�

    if (leftIndex != mid) {
        let lcvalue = parseInt(nums[leftIndex]);
        if (!isNaN(lcvalue)) {
            let left = new Node(lcvalue);
            node.left = left;
            if (insert && first && lcvalue == insertnum) {
                first = false;
                node.left.color = 'red';
            }
            createNodes(nums, leftIndex, left, start, mid - 1, first, insert, insertnum); //�ݹ���ñ�������ֱ������������
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
            createNodes(nums, rightIndex, right, mid + 1, end, first, insert, insertnum); //�ݹ���ñ�������ֱ������������
        }
    }


    let leftHeight = (node.left == null) ? 0 : node.left.height;
    let rightHeight = (node.right == null) ? 0 : node.right.height;

    node.height = (rightHeight > leftHeight) ? rightHeight + 1 : leftHeight + 1;
    //��ǰ�ڵ�ĸ߶�Ϊ��ڵ���ҽڵ���ߵ��Ǹ�+1
}