const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    title: "All tour",
    tours: tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  //console.log(req.params.slug);
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug: slug }).populate({
    path: "reviews",
    fields: "review rating user"
  });
  console.log(tour);
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render("tour", {
      title: `${tour.name} tour`,
      tour: tour
    });
});
