import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Terms() {
  return (
    <div className="flex flex-col h-full gap-4">
      <TabGroup>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold capitalize">
            Terms and Conditions
          </h2>
          <div className="flex items-center gap-4">
            <TabList className="">
              <Tab className="border-b-2 border-b-slate-400 data-[selected]:border-b-white data-[selected]:text-white p-3 focus:outline-none">
                Terms and Conditions
              </Tab>
              <Tab className="border-b-2 border-b-slate-400 data-[selected]:border-b-white data-[selected]:text-white p-3 focus:outline-none">
                Privacy Policy
              </Tab>
            </TabList>
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <div className="mt-2 space-y-5 text-lg leading-relaxed text-justify text-gray-300">
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
          <TabPanel>Content 2</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
