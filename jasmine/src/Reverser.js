
/*
r.reverseNumber(321) === '123'
*/

function Reverser() {}

Reverser.prototype.reverseNumber = function(n)
{
	n = n + "";
	return n.split("").reverse().join("");
}