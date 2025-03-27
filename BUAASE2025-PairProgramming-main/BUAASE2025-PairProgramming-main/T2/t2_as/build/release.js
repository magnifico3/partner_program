export function greedySnakeMoveBarriers(now_snake, food, barriers) {

    const SIZE = 8; // 棋盘大小
    let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

    // 标记障碍物
    for (let i = 0; i < 12; i++) {
        let x = barriers[2 * i] - 1;
        let y = barriers[2 * i + 1] - 1;
        if (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
            board[x][y] = 1;
        }
    }

    // 食物坐标
    let foodX = food[0] - 1, foodY = food[1] - 1;


    let headX = now_snake[0] - 1;
    let headY = now_snake[1] - 1;
    // let bodyX = now_snake[2] - 1;
    // let bodyY = now_snake[3] - 1;
    // let forbiddenDirection = -1;
    // if (headX = bodyX) {
    //     if (headY < bodyY) {
    //         let forbiddenDirection = 0;
    //     } else{
    //         let forbiddenDirection = 2;
    //     }
    // } else if (headX < bodyX) {
    //         let forbiddenDirection = 3;
    //     } else {
    //         let forbiddenDirection = 1;
    //     }
    let ans = findShortestPathWithDirection(board, [headX, headY], [foodX, foodY]);
    if (ans === null) {
        return -1; // 无法到达食物
    } else {
        return ans;
    }
}


function findShortestPathWithDirection(map, start, end) {
    const numRows = map.length;
    const numCols = map[0].length;

    // 定义四个名称
    const directions = [
        { delta: [-1, 0], dir: 1 },  
        { delta: [0, 1], dir: 0 },   
        { delta: [1, 0], dir: 3 },   
        { delta: [0, -1], dir: 2 }   
    ];

    // 初始化队列，起点入队，记录坐标、步数和路径
    const queue = [{ position: start, steps: 0, path: [] }];

    // 初始化访问记录数组
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        const { position: [currentRow, currentCol], steps, path } = queue.shift();

        // 如果到达终点，返回第一步的方向
        if (currentRow === end[0] && currentCol === end[1]) {
            return path.length > 0 ? path[0] : null;
        }

        // 遍历四个方向
        for (const { delta: [dRow, dCol], dir } of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            // 检查新位置是否在地图范围内，是否未被访问过，且不是障碍物
            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                !visited[newRow][newCol] &&
                map[newRow][newCol] === 0
            ) {
                // 标记为已访问
                visited[newRow][newCol] = true;
                // 将新位置加入队列，步数加一，更新路径
                queue.push({ position: [newRow, newCol], steps: steps + 1, path: [...path, dir] });
            }
        }
    }

    // 如果队列为空仍未找到终点，返回 null 表示无法到达
    return null;
}