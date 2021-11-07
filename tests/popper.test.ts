import { defineComponent } from "vue";
import { mount } from "@vue/test-utils";
import { Popper } from "..";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const waitForFinishAnimation = () => wait(200);

describe("Popper", () => {
  test("it should render basic reference and popper", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper>
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <div style=\\"display: none; position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </div>"
    `);
  });

  test("it can render reference as other element", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper reference-is="button">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<button>My reference</button>
      <div style=\\"display: none; position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </div>"
    `);
  });

  test("it can pass props to reference", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper
        reference-is="button"
        :reference-props="{ style: { color: 'red' } }"
      >
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<button style=\\"color: red;\\">My reference</button>
      <div style=\\"display: none; position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </div>"
    `);
  });

  test("it can render popper as other element", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper popper-is="p">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <p style=\\"display: none; position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </p>"
    `);
  });

  test("it can pass props to reference", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper
        popper-is="p"
        :popper-props="{ style: { color: 'red' } }"
      >
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });

    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>My reference</div>
      <p style=\\"color: red; display: none; position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </p>"
    `);
  });

  test("it should show popper when hover reference", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper :reference-props="{ id: 'reference' }">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });
    await waitForFinishAnimation();

    await wrapper.get("#reference").trigger("mouseover");
    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div id=\\"reference\\">My reference</div>
      <div style=\\"position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </div>"
    `);
  });

  test("it should hide popper after hover reference", async () => {
    const wrapper = mount({
      components: { Popper },
      template: `
      <Popper :reference-props="{ id: 'reference' }">
        <template #reference>My reference</template>
        My popper
      </Popper>
    `.trim(),
    });
    await waitForFinishAnimation();
    await wrapper.get("#reference").trigger("mouseover");
    await waitForFinishAnimation();

    await wrapper.get("#reference").trigger("mouseout");
    await waitForFinishAnimation();

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div id=\\"reference\\">My reference</div>
      <div style=\\"position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px); display: none;\\" class=\\"vue-use-popperjs-none\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"> My popper </div>"
    `);
  });

  describe("Teleport", () => {
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

    test("it should teleport", async () => {
      const MyPopper = defineComponent({
        template: "<div>My popper</div>",
      });
      const wrapper = mount({
        components: { Popper, MyPopper },
        template: `
        <Popper
          reference-is="span"
          :reference-props="{ id: 'reference' }"
          :teleport-props="{ to: '#modal' }"
        >
          <template #reference>My reference</template>
          <MyPopper />
        </Popper>
      `.trim(),
      });
      await waitForFinishAnimation();

      await wrapper.get("#reference").trigger("mouseover");
      await waitForFinishAnimation();

      expect(wrapper.html()).toMatchInlineSnapshot(`
        "<span id=\\"reference\\">My reference</span>
        <!--teleport start-->
        <!--teleport end-->"
      `);
      expect(
        wrapper.getComponent(MyPopper).element.parentElement?.outerHTML
      ).toMatchInlineSnapshot(
        `"<div style=\\"position: absolute; left: 0px; top: 0px; margin: 0px; transform: translate(0px, 0px);\\" class=\\"\\" data-popper-reference-hidden=\\"\\" data-popper-escaped=\\"\\" data-popper-placement=\\"bottom\\"><div>My popper</div></div>"`
      );
    });
  });
});
