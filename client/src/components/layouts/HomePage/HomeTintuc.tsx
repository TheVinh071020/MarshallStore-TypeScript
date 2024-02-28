import React from "react";
import { Card } from "antd";
type Props = {};

const HomeTintuc = (props: Props) => {
  return (
    <div>
      {" "}
      <div style={{ padding: "20px 80px" }} className="tintuc mb-12">
        <p className="text-3xl font-bold mb-6">TIN TỨC</p>
        <div className="flex justify-between">
          <div className="">
            <Card
              hoverable
              style={{ width: 320, position: "relative" }}
              cover={
                <img
                  alt="example"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/05/229f215ed3f20cac55e3-e1683722764737.jpg"
                />
              }
            >
              <div>
                <h3 className="font-bold mb-3 text-xl">
                  Review tai nghe Marshall Major 4.
                </h3>
                <p
                  style={{
                    color: "#a5a5a5",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Tổng quan về Marshall Major 4 -Mar...
                </p>
                <p className="font-medium">Continue reading</p>
              </div>
            </Card>
          </div>

          <div className="">
            <Card
              hoverable
              style={{ width: 320, position: "relative" }}
              cover={
                <img
                  alt="example"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/04/338680348_1378888452912102_759862359791985429_n-e1681880689107.jpg"
                />
              }
            >
              <div>
                <h3 className="font-bold mb-3 text-xl">
                  Review Marshall Woburn 3 – Một chiếc loa dành cho Gia đình
                </h3>

                <p className="font-medium">Continue reading</p>
              </div>
            </Card>
          </div>
          <div className="">
            <Card
              hoverable
              style={{ width: 320, position: "relative" }}
              cover={
                <img
                  alt="example"
                  src="https://marshallstorevietnam.vn/wp-content/uploads/2023/03/backstage_carousel_allah-las-1200x1200.jpeg"
                />
              }
            >
              <div>
                <h3 className="font-bold mb-3 text-xl">
                  How to choose a HI-FI stereo system
                </h3>
                <p
                  style={{
                    color: "#a5a5a5",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  At solmen va esser necessi far ...
                </p>
                <p className="font-medium">Continue reading</p>
              </div>
            </Card>
          </div>

          <div className="">
            <Card
              hoverable
              style={{ width: 320, position: "relative" }}
              cover={
                <img
                  alt="example"
                  src="https://vua2hand.com/upload/product/marshall-woburn-iii-chinh-hang-8979.png"
                />
              }
            >
              <div>
                <h3 className="font-bold mb-3 text-xl">
                  How to choose a HI-FI stereo system
                </h3>
                <p
                  style={{
                    color: "#a5a5a5",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Nullam dictum felis eu pede mollis...
                </p>
                <p className="font-medium">Continue reading</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTintuc;
