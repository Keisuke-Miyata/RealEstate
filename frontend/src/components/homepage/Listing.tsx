import React, { FC } from "react";
import useRandomItems from "../../hooks/useDataUtils";
import { PuffLoader } from "react-spinners";
import Item from "../property/PropertyItem";
import TenantItem from "../tenant/TenantItem";
import { TenantRandom, PropertyRandom } from "../../shared/types";


const Listing: FC = () => {
    const { randomItems, isLoading, isError }: { randomItems: (TenantRandom | PropertyRandom)[], isLoading: boolean, isError: boolean } = useRandomItems();

    if (isError) {
        return (
            <div>
                <span>Error while fetching data.</span>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="puffloader">
                <PuffLoader color="#555" aria-label="puff-loading" />
            </div>
        );
    }

    return (
        <section>
            <div className="card-container pb-10">
                {randomItems.map((item: TenantRandom | PropertyRandom) =>
                    item.category === "property" ? (
                        <Item key={item.title} property={item as PropertyRandom} />
                    ) : (
                        <TenantItem key={item.title} tenant={item as TenantRandom} />
                    )
                )}
            </div>
        </section>
    );
};

export default Listing;



