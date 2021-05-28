/**
 * Verify a string corresponds to a color
 */
export function isColor(strColor: string) {
	const s = new Option().style;
	s.color = strColor;
	return s.color !== '';
}
