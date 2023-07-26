export const tree = [];
const element_cache = new Map;
let wrapper_element = null;

const NODE_TYPE_COMPONENT = 0;
const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_MAP = 2;

const SYMBOL_SKIP = Symbol('skip');

const NOP = () => {};

const descriptor_parse = descriptor => {
	let template = element_cache.get(descriptor);
	if (!template) {
		let tag = '';
		const attrs = {};

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

const render_nodes = (nodes, elements_target) => {
	for (const node of nodes) {
		if (!node || node === true) continue;

		switch (node.type) {
		case NODE_TYPE_COMPONENT:
			if (node.children) node.props.children = node.children;
			elements_target.push(
				...render_component(node.component, node.props)
			);
			break;

		case NODE_TYPE_ELEMENT:
			const element = descriptor_parse(node.descriptor);
			Object.assign(element.attrs, node.attrs);
			if (node.children) {
				element.children = [];
				render_nodes(node.children, element.children);
			}
			elements_target.push(element);
			break;

		case NODE_TYPE_MAP:
			const props = node.props || {};
			for (const item of node.data) {
				props.I = item;
				elements_target.push(
					...render_component(node.component, props)
				);
			}
		}
	}
};

const render_component = (component, props) => {
	let nodes = null;
	wrapper_element = null;

	try {
		nodes = component(props);
	}
	catch (thrown) {
		if (thrown !== SYMBOL_SKIP) throw thrown;
	}

	let elements_return = [];
	let elements_target = elements_return;

	if (wrapper_element) {
		elements_return = [wrapper_element];
		wrapper_element.children = elements_target;	
	}

	if (nodes) render_nodes(nodes, elements_target);

	return elements_return;
};

export const defer = NOP;

export const defer_end = NOP;

export const dom_define = (handle, descriptor, attrs) => {
	const template = descriptor_parse(descriptor);
	Object.assign(template.attrs, attrs);
	element_cache.set('#' + handle, template);
};

export const hook_assert = condition => {
	if (!condition) throw SYMBOL_SKIP;
};

export const hook_async = (getter, deps, fallback = null) => fallback;

export const hook_callback = (callback, deps) => NOP;

export const hook_delay = msecs => false;

export const hook_dom = (descriptor, attrs) => {
	wrapper_element = descriptor_parse(descriptor);
	Object.assign(wrapper_element.attrs, attrs);
	return null;
};

export const hook_effect = NOP;

export const hook_map = NOP; // TODO?

export const hook_memo = (getter, deps) => getter(...deps);

export const hook_model = mutations => [mutations.init(null), NOP];

export const hook_object_changes = Object.keys;

export const hook_prev = (value, initial) => initial;

export const hook_rerender = NOP;

export const hook_state = initial => [initial, NOP, () => initial];

export const hook_static = initial => initial;

export const hook_sub = NOP; // TODO?

export const hook_transition = (target, msecs) => target;

export const init = (root, dom) => {
	tree.length = 0;
	element_cache.clear();
	let nodes;

	try {
		nodes = root()[1];
	}
	catch (thrown) {
		if (thrown !== SYMBOL_SKIP) throw thrown;
	}

	if (nodes) render_nodes(nodes, tree);
};

export const node = (component, props, children) => ({
	type: NODE_TYPE_COMPONENT,
	component,
	props,
	children,
});

export const node_dom = (descriptor, attrs, children) => ({
	type: NODE_TYPE_ELEMENT,
	descriptor,
	attrs,
	children,
});

export const node_map = (component, data, props) => ({
	type: NODE_TYPE_MAP,
	component,
	data,
	props,
});

export const now = () => 0;
