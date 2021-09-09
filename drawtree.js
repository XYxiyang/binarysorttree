function showTree(color = false) {
    measure(root);
    initCanvas();
    clear();
    render(root, canvas.width / 2, 10 + radius, color);
}

// �ڵ�뾶
var radius = 20;
// �ֵܽڵ���
var spacing = 20;
// ÿ���࣬���ڵ㵽�ӽڵ�Բ�ľ���
var height = radius * 2 + 30;
// ��������
var padding = 20;

var root = null;

var canvas = null;
var ctx = null;

//�������û�����С
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

//������������λ��
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

    // �����������
    let leftWidth = getWidth(node.left);
    let rightWidth = getWidth(node.right);

    let fixNode = null;
    if (!node.left || !node.right) {
        node.width = leftWidth + rightWidth;
        node.width += spacing;
        node.offset = spacing / 2;
    } else {
        // ��ǰΪ��������ʱ����Ӧ��ռ�ݵĿռ�
        let childSpace = Math.max(rightWidth, leftWidth);
        let factor = getHeight(node.left) - getHeight(node.right);
        node.width = childSpace * 2;
        node.offset = childSpace / 2;
        // ��ȱȽ�С�����ı�Ե����ǰ�����ߵĿ�϶��࣬�ⲿ�ֿհ׿���ȥ��
        let mixWidth = Math.abs(leftWidth - rightWidth) / 2;
        if (factor > 0) {
            if (leftWidth >= rightWidth) {
                // �ϸߵ�������ȴ��ڽϵ͵�����ʱ������ʹ���ǽ�һ�����������ռ�
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
        // �ڵ�֮����ӿ�϶
        node.width += spacing;
        node.offset += spacing / 2;
        // �����ӽڵ�Բ�ľ���
        let distance = childSpace - mixWidth + spacing;
        if (fixNode) {
            let fix = fixWidth(fixNode.offset, distance);
            node.width += fix;
            node.offset += fix / 2;
        }
    }
}

//����ƫ�ƣ���ֹ���ߺ�ȦȦ�غ�
function fixWidth(offset, distance) {
    // ����ͨ���жϼн��Ƿ�����߼н�Сȷ���Ƿ��������ߺͽڵ��ص�
    if (Math.atan(height / offset) < Math.asin(radius / distance)) {
        // let sin = radius / (x + distance);
        // let tan = height / (x + f);
        // tan = sin/sqrt(1-sin^2)
        let sR = radius * radius;
        let sF = offset * offset;
        let sD = distance * distance;
        let sH = height * height;
        // һԪ���η������
        let a = sR - sH;
        let b = 2 * (sR * offset - sH * distance);
        let c = sH * sR + sR * sF - sH * sD;
        let res = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        let res2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        return res >= 0 ? res : res2;
    }
    return 0;
}

//���ؽڵ���
function getWidth(node) {
    return node ? node.width : 0;
}

//�ݹ������
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