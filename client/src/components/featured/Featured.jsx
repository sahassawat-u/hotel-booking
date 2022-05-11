import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Bangkok,Chiang Mai,Phuket"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://www.tripsavvy.com/thmb/IkoPZKwM5BmhWB-064flnLZWylo=/3804x3804/smart/filters:no_upscale()/bangkok-at-sunset-5bd5f2f746e0fb005818e042.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bangkok</h1>
              <h2>{data[0]} Properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cdn.getyourguide.com/img/tour/5d355ccf881c5.jpeg/98.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Chiang Mai</h1>
              <h2>{data[1]} Properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5d/c8/caption.jpg?w=700&h=500&s=1&cx=2606&cy=1838&chk=v1_a61182fd4040ed4ecc4e"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Phuket</h1>
              <h2>{data[2]} Properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
