function showTree(color = false) {
    measure(root);
    initCanvas();
    clear();
    render(root, canvas.width / 2, 10 + radius, color);
}

// 节点半径
var radius = 20;
// 兄弟节点间距
var spacing = 20;
// 每层间距，父节点到子节点圆心距离
var height = radius * 2 + 30;
// 画布留白
var padding = 20;

var root = null;

var canvas = null;
var ctx = null;

//重新设置画布大小
function initCanvas() {
    canvas = document.getElementById('canvas');
    const cvHeight = (root.height - 1) * height + radius * 2 + padding * 2;
    const cvWidth = root.width + padding * 2;
    canvas.style.height = cvHeight + 'px';
    canvas.style.width = cvWidth + 'px';
    canvas.height = cvHeight;
    canvas.width = cvWidth;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold ' + 20 + 'px serif';
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//测量整个树的位置
function measure(node) {
    if (node == null) {
        return;
    }
    if (!node.left && !node.right) {
        node.width = radius * 2;
        return;
    }
    measure(node.left);
    measure(node.right);

    // 左右子树宽度
    let leftWidth = getWidth(node.left);
    let rightWidth = getWidth(node.right);

    let fixNode = null;
    if (!node.left || !node.right) {
        node.width = leftWidth + rightWidth;
        node.width += spacing;
        node.offset = spacing / 2;
    } else {
        // 当前为满二叉树时子树应该占据的空间
        let childSpace = Math.max(rightWidth, leftWidth);
        let factor = getHeight(node.left) - getHeight(node.right);
        node.width = childSpace * 2;
        node.offset = childSpace / 2;
        // 宽度比较小子树的边缘到当前树中线的空隙间距，这部分空白可以去掉
        let mixWidth = Math.abs(leftWidth - rightWidth) / 2;
        if (factor > 0) {
            if (leftWidth >= rightWidth) {
                // 较高的子树宽度大于较低的子树时，可以使它们进一步靠近缩减空间
                let div = Math.pow(2, getHeight(node.right));
                let leftSpace = leftWidth / div - radius;
                if (leftSpace < 0) {
                    leftSpace = 0;
                }
                mixWidth += leftSpace;
                fixNode = node.left;
            }
        } else if (factor < 0) {
            if (rightWidth >= leftWidth) {
                let div = Math.pow(2, getHeight(node.left));
                let rightSpace = rightWidth / div - radius;
                if (rightSpace < 0) {
                    rightSpace = 0;
                }
                mixWidth += rightSpace;
                fixNode = node.right;
            }
        }
        node.width -= mixWidth;
        node.offset -= mixWidth / 2;
        // 节点之间添加空隙
        node.width += spacing;
        node.offset += spacing / 2;
        // 左右子节点圆心距离
        let distance = childSpace - mixWidth + spacing;
        if (fixNode) {
            let fix = fixWidth(fixNode.offset, distance);
            node.width += fix;
            node.offset += fix / 2;
        }
    }
}

//修正偏移，防止连线和圈圈重合
function fixWidth(offset, distance) {
    // 这里通过判断夹角是否比切线夹角小确定是否有连接线和节点重叠
    if (Math.atan(height / offset) < Math.asin(radius / distance)) {
        // let sin = radius / (x + distance);
        // let tan = height / (x + f);
        // tan = sin/sqrt(1-sin^2)
        let sR = radius * radius;
        let sF = offset * offset;
        let sD = distance * distance;
        let sH = height * height;
        // 一元二次方程求根
        let a = sR - sH;
        let b = 2 * (sR * offset - sH * distance);
        let c = sH * sR + sR * sF - sH * sD;
        let res = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        let res2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        return res >= 0 ? res : res2;
    }
    return 0;
}

//返回节点宽度
function getWidth(node) {
    return node ? node.width : 0;
}

//递归绘制树
function render(node, x, y) {
    if (node == null) {
        return;
    }
    if (node.left != null) {
        let lx = x - node.offset;
        let ly = y + height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(lx, ly);
        ctx.stroke();
        render(node.left, lx, ly);
    }
    if (node.right != null) {
        let rx = x + node.offset;
        let ry = y + height;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(rx, ry);
        ctx.stroke();
        render(node.right, rx, ry);
    }
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.closePath();
    if (node.color == 'white') {
        ctx.fillStyle = 'white';
        ctx.fill('nonzero');
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'red';
        ctx.fill('nonzero');
        ctx.fillStyle = 'black';
    }
    ctx.stroke();
    ctx.fillText(node.value.toString(), x, y);
}