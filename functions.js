var nums;
var root;

//������������ݴ�������������
function createTree() {
    let tips = document.getElementById("tips");
    tips.innerHTML = "";
    let origindata = document.getElementById('input');
    nums = origindata.value.split(',');

    if (nums.length < 0)
        return;


    nums.sort(function(a, b) { return a - b; }); //��С���� ��������
    console.log(nums)
    let length;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;
    let firstnum = parseInt(nums[Math.floor(length / 2)]); //�ҵ����м��������Ϊ���ڵ�

    if (isNaN(firstnum))
        return;

    root = new Node(firstnum); //�������ڵ�

    createNodes(nums, 0, root, 0, nums.length - 1); //����һ����
    showTree(); //��ʾ��

}



//����һ���ڵ�
function insertNode() {
    let tips = document.getElementById("tips");
    tips.innerHTML = "";

    let insertnum = document.getElementById('insert').value;

    if (isNaN(insertnum))
        return;
    nums.push(insertnum);
    nums.sort(function(a, b) { return a - b; }); //��С���� ��������

    let length;
    let first = true;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;

    let firstnum = parseInt(nums[Math.floor(length / 2)]); //�ҵ����м��������Ϊ���ڵ�
    if (isNaN(firstnum))
        return;


    root = new Node(firstnum); //�������ڵ�
    if (firstnum == insertnum) {
        first = false;
        root.color = 'red';
    }
    createNodes(nums, 0, root, 0, nums.length - 1, first, true, insertnum); //����һ����
    showTree(); //��ʾ��
}

//ɾ��һ���ڵ�
function deleteNode() {
    let deletenum = document.getElementById('delete').value;

    if (isNaN(deletenum))
        return;


    if (nums.indexOf(deletenum) == -1) {
        let tips = document.getElementById("tips");
        tips.innerHTML = "��Ҫɾ���Ľڵ㲻���ڣ�";
        return;
    } else {
        nums.splice(nums.indexOf(deletenum), 1);
        let tips = document.getElementById("tips");
        tips.innerHTML = "";
    } //�ҵ���Ӧ�����������ɾ�� 

    nums.sort(function(a, b) { return a - b; }); //��С���� ��������
    let length;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;
    let firstnum = parseInt(nums[Math.floor(length / 2)]); //�ҵ����м��������Ϊ���ڵ�
    if (isNaN(firstnum))
        return;



    root = new Node(firstnum); //�������ڵ�
    createNodes(nums, 0, root, 0, nums.length - 1); //����һ����
    showTree(); //��ʾ��

}