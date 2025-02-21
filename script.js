$(document).ready(function() {
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { X: 0, O: 0, D: 0 };
    
    // Create game board
    for (let i = 0; i < 9; i++) {
        $('#board').append('<div class="cell" data-index="' + i + '"></div>');
    }

    // Handle cell click
    $('.cell').click(function() {
        const index = $(this).data('index');
        
        if (gameState[index] === '' && gameActive) {
            gameState[index] = currentPlayer;
            $(this).addClass(currentPlayer === 'X' ? 'x-mark' : 'o-mark').text(currentPlayer);
            
            if (checkWin()) {
                handleWin();
            } else if (gameState.every(cell => cell !== '')) {
                handleDraw();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });

    // Check win conditions
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern => {
            if (pattern.every(index => gameState[index] === currentPlayer)) {
                pattern.forEach(i => {
                    return $(`.cell[data-index="${i}"]`).css('transform', 'scale(1.1)');
                });
                return true;
            }
            return false;
        });
    }

    function handleWin() {
        gameActive = false;
        scores[currentPlayer]++;
        updateScores();
    }

    function handleDraw() {
        gameActive = false;
        scores.D++;
        updateScores();
        $('.cell').addClass('draw');
    }

    // Reset game
    $('#resetBtn').click(function() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        $('.cell').removeClass('x-mark o-mark draw').text('').css('transform', 'scale(1)');
    });

    function updateScores() {
        $('#xScore').text(scores.X);
        $('#oScore').text(scores.O);
        $('#drawCount').text(scores.D);
    }

    // Navigation
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('.page').addClass('d-none');
        $(target).removeClass('d-none');
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });
});

// Responsive design adjustments
$(window).resize(function() {
    const screenWidth = $(window).width();
    $('.cell').css({
        width: screenWidth < 768 ? '60px' : '80px',
        height: screenWidth < 768 ? '60px' : '80px',
        fontSize: screenWidth < 768 ? '2em' : '2.5em'
    });
}).trigger('resize');