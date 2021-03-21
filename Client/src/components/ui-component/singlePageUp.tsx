import React from "react";
import { CaretUpSquareFill } from "react-bootstrap-icons";

export default function SingleTravelCard() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="mx-auto">
            <div className="col-lg-12">
              <div className="text-center my-3">
                <div className="card-deck no-gutters">
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card h-100 mb-4">
                      <div className="card-header">
                        <h5 className="card-title m-0 p-0 font-weight-bolder text-secondary">
                          Connected Devices and Sensors
                        </h5>
                      </div>
                      <div className="card-body text-left">
                        <p className="card-text">
                          Arduino, Raspbery, Watson or Adafruit{" "}
                        </p>
                        <span className="font-lead-base font-weight-bold text-muted">
                          20% Off!
                        </span>
                        <div className="promotion-promo">$ 11.5</div>
                        <div className="promotion-price">
                          <div className="promotion-price-desc">Now</div>
                          <div className="promotion-price-text">$ 9.5</div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <a href="#" className="btn btn-warning">
                          Order
                        </a>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="card h-100 mb-4">
                      <div className="card-header">
                        <h5 className="card-title m-0 p-0 font-weight-bolder text-secondary">
                          Device Data Counter Status
                        </h5>
                      </div>
                      <div className="card-body text-left">
                        <p className="card-text">
                          Up to 500 registered devices, data analyzed per month.
                        </p>
                        <span className="font-lead-base font-weight-bold text-muted">
                          20% Off!
                        </span>
                        <div className="promotion-promo">$ 12.2</div>
                        <div className="promotion-price">
                          <div className="promotion-price-desc">Now</div>
                          <div className="promotion-price-text">$ 10.2</div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <a href="#" className="btn btn-warning">
                          Order
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
