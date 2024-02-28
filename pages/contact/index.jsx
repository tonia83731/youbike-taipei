import ContactCardLayout from "@/components/contact/ContactCardLayout";
import HeadSettings from "@/components/head/HeadSettings";
import DefaultInput from "@/components/input/DefaultInput";

import { promises as fs } from "fs";
import path from "path";
import { useState } from "react";

export default function NewsPage(props) {
  const { info, stations } = props;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    text: "",
  });
  // console.log(info);
  const handleContactSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <HeadSettings
        pageName="聯絡我們"
        pageDescription="This is YouBike contact page."
      />
      <section className="">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          聯絡我們
        </h3>
        <div className="mb-6 grid grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2">
          {/* youbike info */}
          <div className="grid grid-rows-4 gap-2">
            <ContactCardLayout>
              <div className="h-full flex flex-col justify-center text-olive-100 text-lg">
                <div>
                  連絡電話:{" "}
                  <a href={`tel:${info[0].phone}`} className="hover:underline">
                    {info[0].phone}
                  </a>
                </div>
                <div>
                  電子郵件:{" "}
                  <a
                    href={`mailto:${info[0].email}`}
                    className="hover:underline"
                  >
                    {info[0].email}
                  </a>
                </div>
              </div>
            </ContactCardLayout>
            {stations.map((station) => {
              return (
                <ContactCardLayout key={station.name}>
                  <h5 className="font-bold text-olive-100 text-xl mb-2">
                    {station.name}
                  </h5>
                  <div>
                    服務地址: <span>{station.address}</span>
                  </div>
                  <div>
                    服務時間: <span>{station.service_time}</span>
                  </div>
                  <p className="text-slate-400">
                    ※國定假日及特殊活動調整服務時間，請詳見公告。
                  </p>
                </ContactCardLayout>
              );
            })}
          </div>
          <ContactCardLayout>
            <form
              action=""
              className="px-4 py-6"
              onSubmit={handleContactSubmit}
            >
              <DefaultInput
                label="姓名"
                id="contact-name"
                name="name"
                // isRequired={true}
                inputValue={formData.name}
                onInputChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <DefaultInput
                  label="電話"
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  inputValue={formData.phone}
                  onInputChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <DefaultInput
                  label="Email"
                  id="contact-email"
                  name="email"
                  type="email"
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  // isRequired={true}
                  inputValue={formData.email}
                  onInputChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mt-2 mb-4">
                <label
                  htmlFor="contact-text"
                  className="text-olive-100 text-xl font-semibold"
                >
                  告訴我們你的想法...
                </label>
                <textarea
                  name="text"
                  id="contact-text"
                  cols="30"
                  rows="10"
                  className="px-4 border-b-[3px] border-olive-100 focus:outline-none focus:border-lime-100 resize-none"
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  // required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-1/4 py-2 mt-4 bg-lime-100 text-white rounded-md"
                  >
                    提交
                  </button>
                </div>
              </div>
            </form>
          </ContactCardLayout>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const getJsonData = async (fileName) => {
    const filePath = path.join(process.cwd(), "data", `${fileName}.json`);
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
  };
  const info_data = await getJsonData("contactInfo");
  const station_data = await getJsonData("contactStation");
  console.log(station_data);

  return {
    props: {
      info: info_data,
      stations: station_data,
    },
    revalidate: 1800,
  };
}
