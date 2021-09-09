var nums;
var root;

//根据输入的数据创建二叉排序树
function createTree() {
    let tips = document.getElementById("tips");
    tips.innerHTML = "";
    let origindata = document.getElementById('input');
    nums = origindata.value.split(',');

    if (nums.length < 0)
        return;


    nums.sort(function(a, b) { return a - b; }); //从小到大 进行排序
    console.log(nums)
    let length;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;
    let firstnum = parseInt(nums[Math.floor(length / 2)]); //找到最中间的数据作为根节点

    if (isNaN(firstnum))
        return;

    root = new Node(firstnum); //建立根节点

    createNodes(nums, 0, root, 0, nums.length - 1); //创建一棵树
    showTree(); //显示树

}



//插入一个节点
function insertNode() {
    let tips = document.getElementById("tips");
    tips.innerHTML = "";

    let insertnum = document.getElementById('insert').value;

    if (isNaN(insertnum))
        return;
    nums.push(insertnum);
    nums.sort(function(a, b) { return a - b; }); //从小到大 进行排序

    let length;
    let first = true;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;

    let firstnum = parseInt(nums[Math.floor(length / 2)]); //找到最中间的数据作为根节点
    if (isNaN(firstnum))
        return;


    root = new Node(firstnum); //建立根节点
    if (firstnum == insertnum) {
        first = false;
        root.color = 'red';
    }
    createNodes(nums, 0, root, 0, nums.length - 1, first, true, insertnum); //创建一棵树
    showTree(); //显示树
}

//删除一个节点
function deleteNode() {
    let deletenum = document.getElementById('delete').value;

    if (isNaN(deletenum))
        return;


    if (nums.indexOf(deletenum) == -1) {
        let tips = document.getElementById("tips");
        tips.innerHTML = "您要删除的节点不存在！";
        return;
    } else {
        nums.splice(nums.indexOf(deletenum), 1);
        let tips = document.getElementById("tips");
        tips.innerHTML = "";
    } //找到对应的数据项进行删除 

    nums.sort(function(a, b) { return a - b; }); //从小到大 进行排序
    let length;
    if (nums.length % 2 == 0)
        length = nums.length - 1;
    else
        length = nums.length;
    let firstnum = parseInt(nums[Math.floor(length / 2)]); //找到最中间的数据作为根节点
    if (isNaN(firstnum))
        return;



    root = new Node(firstnum); //建立根节点
    createNodes(nums, 0, root, 0, nums.length - 1); //创建一棵树
    showTree(); //显示树

}