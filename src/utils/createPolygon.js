const createPolygon = viewport => {
  const centre = viewport.getCenter();
  const ne = viewport.getNorthEast();
  const sw = viewport.getSouthWest();

  let polygon = [];

  polygon.push(
    `"${ne.lat()},${ne.lng()}"`,
    `"${sw.lat()},${ne.lng()}"`,
    `"${sw.lat()},${sw.lng()}"`,
    `"${ne.lat()},${sw.lng()}"`
  );

  polygon = polygon.join(',');

  return {
    centre,
    polygon,
  };
};

export default createPolygon;
