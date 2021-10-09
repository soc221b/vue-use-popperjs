import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { Popper } from "..";

const waitForShowPopper = () =>
  new Promise((resolve) => setTimeout(resolve, 1000));

beforeEach(() => {
  // create teleport target
  const el = document.createElement("div");
  el.id = "modal";
  document.body.appendChild(el);
});

afterEach(() => {
  // clean up
  document.body.outerHTML = "";
});

describe("Popper", () => {
  test("it should render basic reference and popper", () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper>
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <div style=\\"display: none;\\"> My popper </div>"
    `);
  });

  test("it can render reference as other element", () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper reference-is="button">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<button>My reference</button>
      <div style=\\"display: none;\\"> My popper </div>"
    `);
  });

  test("it can pass props to reference", () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper reference-is="button" :reference-props="{ type: 'button' }">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<button type=\\"button\\">My reference</button>
      <div style=\\"display: none;\\"> My popper </div>"
    `);
  });

  test("it can render popper as other element", () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper popper-is="p">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <p style=\\"display: none;\\"> My popper </p>"
    `);
  });

  test("it can pass props to reference", () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper popper-is="p" :popper-props="{ style: { color: 'red' } }">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <p style=\\"color: red; display: none;\\"> My popper </p>"
    `);
  });
});
