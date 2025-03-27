export function greedy_snake_move(now_snake, food) {
    let up = 0, left = 1, down = 2, right = 3;
    let forbiddenDirection = [];
    //这段表示蛇头不能走到第一节蛇身的位置
    if (now_snake[0] == now_snake[2]) {
        if (now_snake[1] < now_snake[3]) {
            forbiddenDirection.push(up);
        } else {
            forbiddenDirection.push(down);
        }
    } else {
        if (now_snake[0] < now_snake[2]) {
            forbiddenDirection.push(right);
        }
        else {
            forbiddenDirection.push(left);
        }
    }

    //这段表示蛇头不能走到边界
    if (now_snake[0] == 1) {
        forbiddenDirection.push(left);
    } else if (now_snake[0] == 8) {
        forbiddenDirection.push(right);
    }
    if (now_snake[1] == 1) {
        forbiddenDirection.push(down);
    }
    else if (now_snake[1] == 8) {
        forbiddenDirection.push(up);
    }
    console.log(forbiddenDirection);
    
    //这段表示蛇头朝向食物的方向
    if (now_snake[0] < food[0]) {
        if (!forbiddenDirection.includes(right)) {
            return right;
        } else {
            if (now_snake[1] < food[1] && !forbiddenDirection.includes(up)) {
                return up;
            } else if (!forbiddenDirection.includes(down)) {
                return down;
            } else {
                return left;
            }
        }
    } 
    else if (now_snake[0] > food[0]) {
        if (!forbiddenDirection.includes(left)) {
            return left;
        } else {
            if (now_snake[1] < food[1] && !forbiddenDirection.includes(up)) {
                return up;
            } else if (!forbiddenDirection.includes(down)) {
                return down;
            } else {
                return right;
            }
        }
    } else {
        if (now_snake[1] < food[1]) {
            if (!forbiddenDirection.includes(up)) {
                return up;
            } else {
                if (!forbiddenDirection.includes(left)) {
                    return left;
                } else if (!forbiddenDirection.includes(right)) {
                    return right;
                } else {
                    return down;
                }
            }
        } else {
            if (!forbiddenDirection.includes(down)) {
                return down;
            } else {
                if (!forbiddenDirection.includes(left)) {
                    return left;
                } else if (!forbiddenDirection.includes(right)) {
                    return right;
                } else {
                    return up;
                }
            }
        }
    }
}