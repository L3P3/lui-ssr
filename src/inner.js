const NOP = () => {};

export let tree = null;

let element_cache = new Map;

const descriptor_parse = descriptor => {
	let template = element_cache.get(descriptor);
	if (!template) {
		let tag = '';
		let attrs = {};

		const index_sqb = descriptor.indexOf('[');
		if (index_sqb === -1) tag = descriptor;
		else {
			tag = descriptor.substring(0, index_sqb);

			for (
				const sqbi of
				descriptor
				.substring(
					index_sqb + 1,
					descriptor.length - 1
				)
				.split('][')
			) {
				const eqi = sqbi.indexOf('=');

				if (eqi > 0)
					attrs[
						sqbi.substring(0, eqi)
					] =
						sqbi.substring(eqi + 1);
				else
					attrs[sqbi] = true;
			}
		}

		element_cache.set(descriptor, template = {
			tag,
			attrs,
		});
	}

	return {
		tag: template.tag,
		attrs: Object.assign({}, template.attrs),
	};
};

export const defer = NOP;

export const defer_end = NOP;

export const dom_define = (handle, descriptor, attrs) => {
	const template = descriptor_parse(descriptor);
	Object.assign(template.attrs, attrs);
	element_cache.set('#' + handle, template);
};

export const hook_assert = NOP; // TODO

export const hook_async = (getter, deps, fallback = null) => fallback;

export const hook_callback = (callback, deps) => NOP;

export const hook_delay = msecs => false;

export const hook_dom = (descriptor, attrs) => {
	const element = descriptor_parse(descriptor);
	Object.assign(element.attrs, attrs);
	// TODO
	return null;
};

export const hook_effect = NOP;

export const hook_map = NOP; // TODO?

export const hook_memo = (getter, deps) => getter(...deps);

export const hook_model = mutations => mutations.init(null);

export const hook_object_changes = Object.keys;

export const hook_prev = (value, initial) => initial;

export const hook_rerender = NOP;

export const hook_state = initial => [initial, NOP, () => initial];

export const hook_static = initial => initial;

export const hook_sub = NOP; // TODO?

export const hook_transition = (target, msecs) => target;

export const init = (root, dom) => {
	tree = [];
	element_cache.clear();
	// TODO
};

export const node = (component, props, children) => {
	// TODO
	return null;
};

export const node_dom = (descriptor, attrs, children) => {
	// TODO
	return null;
};

export const node_map = (component, data, props) => {
	// TODO
	return null;
};

export const now = () => 0;
