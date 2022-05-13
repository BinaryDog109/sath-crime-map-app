export const folderClusterRenderer = {render: ({ position, count }, stats) => {
  // change color if this cluster has more markers than the mean cluster
  const color =
    count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";

  // create marker using svg icon
  // eslint-disable-next-line no-undef
  return new google.maps.Marker({
    position,
    icon: {
      url: `http://localhost:3000/map-icons/cluster.png`,
      // eslint-disable-next-line no-undef
      scaledSize: new google.maps.Size(45, 45),
    },
    label: {
      text: String(count),
      color: "#779bff",
      fontSize: "10px",
      fontFamily: "Roboto",
      className: "cluster-marker-label"
    },
    // adjust zIndex to be above other markers
    zIndex: 1000 + count,
  });
}};
