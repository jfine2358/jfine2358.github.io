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
	    // Don't set the focus on page load.
	    // https://github.com/jfine2358/scratch/issues/8
	    next(true);

	    // Get nodes src and jax.
	    var answer = document.getElementById('answer_input');
	    var answer_render = document.getElementById('answer_render');
	    var jax = MathJax.Hub.getAllJax(answer_render)[0];

	    var update_answer =  function() {
		MathJax.Hub.Queue(['Text', jax, answer.value])
	    };

	    // Have input at src queue update on jax.
	    answer_input.addEventListener('input', update_answer);

	    update_answer();

	})
    }
}

var solutions = [
    // First.
    [
	'3^2 + 4^2 = 5^2',
	'32 + 42 = 52'
    ],
    [
	'r^2 = x^2 + y^2 + z^2',
	'r2 = x2 + y2 + z2'
    ],
    [
	'r^2 = x_1^2 + x_2^2 + x_3^2',
	'r^2 = x1^2 + x2^2 + x3^2'
    ],
    [
	'r^2 = x_1^2 + x_2^2 + x_3^2',
	'r2 = x12 + x22 + x32'
    ],
    [
	'r^2 = \\sum_1^3 x_i^2',
	'r^2 = \\sum 13 x_i^2'
    ],
    // Second.
    [
	'2^9 = 512',
	'29 = 512'
    ],

    [
	'2^{10} = 1024',
	'2^10 = 1024'
    ],
    [
	'F_{n} = F_{n-2} + F_{n-1}',
	'F_n = F_n-2 + F_n-1'
    ],
    [
	'n^{a_1}',
	'n^a_1'
    ],
    [
	'2^{2^0} = 2^1 = 2',
	'2^2^0 = 2^1 = 2'
    ],
    [
	'{2^2}^0 = 4^0 = 1',
	'2^2^0 = 4^0 = 1'
    ],
    [
	'r^2 = \\sum_{i=1}^3 x_i^2',
	'r^2 = \\sum _i=1^3 x_i^2'
    ]
];

solutions.ptr = -1

var next = function(nofocus){

    var dofocus = ! nofocus;

    solutions.ptr = (solutions.ptr + 1) % solutions.length;
    var exercise = solutions[solutions.ptr];
    var solution = exercise[0];
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

    document.getElementById('answer_input').value = exercise[1];
    document.getElementById('answer_input').dispatchEvent(
	new Event('input', { bubbles: true })
    );

    // Don't set the focus on page load.
    // https://github.com/jfine2358/scratch/issues/8
    if (dofocus)
    {
	// TODO: Move focus to start of input box.
	document.getElementById('answer_input').focus();
    }

}

document.getElementById('form').onsubmit = next
