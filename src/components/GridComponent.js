import { useRef, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";

export default function GridComponent({ filteredFlags }) {

  return (
    <Grid container spacing={3}>
     {filteredFlags?.map((item, index) => {
        return (
          <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
            <div
              className="img"
              style={{
                position: "relative",
                width: "100%",
                height: 180,
                overflow: "hidden",
                marginBottom: 10,
                borderRadius: 10,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 100,
                  textTransform: "uppercase",
                  color: "#fff",
                }}
              >
                {item.region === "Americas" ? (
                  <Typography
                    style={{
                      backgroundColor: "rgba(17, 157, 164, 0.8)",
                      fontSize: 10,
                      fontWeight: "bold",
                      padding: 5,
                      borderRadius: 3,
                    }}
                  >
                    {item.region}
                  </Typography>
                ) : item.region === "Europe" ? (
                  <Typography
                    style={{
                      backgroundColor: "rgba(237, 93, 93, 0.8)",
                      fontSize: 10,
                      fontWeight: "bold",
                      padding: 5,
                      borderRadius: 3,
                    }}
                  >
                    {item.region}
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      backgroundColor: "rgba(255, 140, 40, 0.8)",
                      fontSize: 10,
                      fontWeight: "bold",
                      padding: 5,
                      borderRadius: 3,
                    }}
                  >
                    {item.region}
                  </Typography>
                )}
              </div>
              <img
                alt=""
                src={item.flag}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  "&:hover": {
                    transformOrigin: "50% 50%",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </div>
            <Typography
              variant="h6"
              style={{ fontWeight: 600, color: "#333", lineHeight: 1.2 }}
            >
              {item.name}
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Typography
                variant="body2"
                style={{ color: "#666", fontWeight: 600, marginRight: 5 }}
              >
                Capital: {item.capital}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#999", marginRight: 5 }}
              >
                Population: {(item.population / 1000000).toFixed(2) + "m"}
              </Typography>

              {/* <Typography variant="body2" style={{ color: "#ED5D5D" }}>
                {item.region}
              </Typography> */}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
