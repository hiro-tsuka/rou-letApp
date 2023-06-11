import Link from "next/link";

const Items = ({currentItems, items}) => {
  // const [links, linksState] = useState(items);
  
    return (
      <div className="itemsbox">
        <table>
          <tbody>
            {currentItems && currentItems.map((location) => //currentItemsは初期値としてnullが入ってきてしまうので、条件分岐でtureのときに繰り返しを実行するようにする
              <tr key={location.facility_name}>
                <Link href={`/about/${location.id}`}>
                  <a>
                    <div>
                      <td>{location.facility_name}</td>
                      <td>{location.address}</td>
                    </div>
                  </a>
                </Link>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    )
  }

  export default Items;