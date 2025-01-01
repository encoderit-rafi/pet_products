import BaseTabList from "@/components/tabs/BaseTabList";
import Title from "@/components/texts/Title";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";

export default function Terms() {
  return (
    <div className="flex flex-col h-full gap-4 text-custom_bg_three">
      <TabGroup>
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <Title>Terms and Conditions</Title>
          <div className="flex items-center gap-4">
            <BaseTabList
              list={[
                {
                  name: "Terms and Conditions",
                },
                { name: "Privacy Policy" },
              ]}
            />
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="mt-2 space-y-5 overflow-y-auto text-sm leading-relaxed lg:text-base font-extralight md:text-justify ">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illor explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur ma gni dolores eos qui ratione vwt m ipsum quia
                dolor sit amet, consectetur, adipisci velit, sed quia noni Sed
                ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium d e ab illo inventore verita tis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut o tione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illor explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur ma gni dolores eos qui ratione vwt m ipsum quia
                dolor sit amet, consectetur, adipisci velit, sed quia noni Sed
                ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium d e ab illo inventore verita tis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut o Sed ut perspiciatis unde
                omnis iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illor
                explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                aspernatur aut odit aut fugit, sed quia consequuntur ma gni
                dolores eos qui ratione vwt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                quia consequuntur ma gni dolores eos qui ratione vwt m ipsum
                quia dolor sit amet, consectetur, adipisci velit, sed quia noni
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium d e ab illo inventore verita tis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut o tione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illor explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur ma gni dolores eos qui ratione vwt m ipsum quia
                dolor sit amet, consectetur, adipisci velit, sed quia noni Sed
                ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium d e ab illo inventore verita tis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut o tione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum.
              </p>
            </div>
          </TabPanel>
          {/* <TabPanel>Content 2</TabPanel> */}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
