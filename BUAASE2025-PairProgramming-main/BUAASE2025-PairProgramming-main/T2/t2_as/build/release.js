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

    let bodyX = now_snake[2] - 1;
    let bodyY = now_snake[3] - 1;
    let forbiddenDirection = -1;
    if (headX == bodyX) {
        if (headY < bodyY) {
            let forbiddenDirection = 0;
        } else{
            let forbiddenDirection = 2;
        }
    } else if (headX < bodyX) {
            let forbiddenDirection = 3;
        } else {
            let forbiddenDirection = 1;
        }
    
    let ans = findShortestPathWithDirection(board, [headX, headY], [foodX, foodY], forbiddenDirection);
    if (ans === null) {
        return -1; // 无法到达食物
    } else {
        return ans;
    }
}


function findShortestPathWithDirection(map, start, end, forbiddenDirection) {
    const numRows = map.length;
    const numCols = map[0].length;

    const directions = [
        { delta: [-1, 0], dir: 1 },  // 上
        { delta: [0, 1], dir: 0 },   // 右
        { delta: [1, 0], dir: 3 },   // 下
        { delta: [0, -1], dir: 2 }   // 左
    ];

    const queue = [{ position: start, steps: 0, path: [] }];

    const visited = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => new Set())
    );
    visited[start[0]][start[1]].add("");

    while (queue.length > 0) {
        const { position: [currentRow, currentCol], steps, path } = queue.shift();

        if (currentRow === end[0] && currentCol === end[1]) {
            if (path.length > 0 && path[0] !== forbiddenDirection) {
                return path[0];
            }
            // 否则继续搜索其他路径
            continue;
        }

        for (const { delta: [dRow, dCol], dir } of directions) {
            const newRow = currentRow + dRow;
            const newCol = currentCol + dCol;

            if (
                newRow >= 0 && newRow < numRows &&
                newCol >= 0 && newCol < numCols &&
                map[newRow][newCol] === 0
            ) {
                const newPath = [...path, dir];
                const pathKey = newPath.slice(0, 5).join(","); // 控制访问标记粒度

                if (!visited[newRow][newCol].has(pathKey)) {
                    visited[newRow][newCol].add(pathKey);
                    queue.push({ position: [newRow, newCol], steps: steps + 1, path: newPath });
                }
            }
        }
    }

    return null; // 无法到达或没有合法路径
}
