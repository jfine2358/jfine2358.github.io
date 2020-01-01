// TODO: Understand, refactor and clean up this code.

// Based on code on page http://asciimath.org/
window.MathJax = {

    "fast-preview": {
	disabled: true
    },

    AuthorInit: function() {
	MathJax.Hub.Register.StartupHook('End', function() {

	    MathJax.Hub.processSectionDelay = 0

	    // Get the next (first) solution.
	    next();

	    // Get nodes src and jax.
	    var answer = document.getElementById('answer_input')
	    var answer_render = document.getElementById('answer_render')
	    var jax = MathJax.Hub.getAllJax(answer_render)[0]

	    // Have input at src queue update on jax.
	    answer_input.addEventListener('input', function() {
	      MathJax.Hub.Queue(['Text', jax, answer.value])
	    })

	})
    }
}

var solutions = [
    '2 + 2 = 4',
    '2 \\times 3 = 6',
    '\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}',
    '3^2 + 4^2 = 5^2',
    '1 + 2 + 3 + 4 = 10 = 4 \\times 5 / 2',
    '1 + 2 + \\cdots + 99 + 100 = 100 \\times 101 / 2 = 5050',
    'a^2 + b^2 = c^2',
    'x^3 + y^3 \\neq z^3',
    '\\int_{x=0}^1 x^2 \\, dx= \\frac{1}{3}',
    'F_{n} = F_{n-2} + F_{n-1}'
];

solutions.ptr = -1


var next = function(){

    solutions.ptr = (solutions.ptr + 1) % solutions.length;
    solution = solutions[solutions.ptr]
    document.getElementById('solution_show').innerText = solution;



    var answer_render = document.getElementById('answer_render');
    var solution_render = document.getElementById('solution_render');
    var jax = MathJax.Hub.getAllJax(solution_render)[0];

    // Synchronize height of the render boxes.
    var update_height = function(){
	answer_render.style.height = solution_render.offsetHeight;
    }

    MathJax.Hub.Queue(
	['Text', jax, solution],
	[update_height]
    );

    document.getElementById('answer_input').value = '';
    document.getElementById('answer_input').dispatchEvent(
	new Event('input', { bubbles: true })
    );

    document.getElementById('answer_input').focus();

}

document.getElementById('form').onsubmit = next
