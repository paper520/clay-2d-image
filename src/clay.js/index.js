import render from 'clay-core';
import Sizzle from 'sizzle';

let clay = render(window);
clay.config("$sizzleProvider", () => (selector, context) => Sizzle(selector, context));

export default clay;