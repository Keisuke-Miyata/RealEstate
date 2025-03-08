import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCarousel from "../../components/media/ImageCarousel";
import TenantInfo from "../../components/tenant/TenantInfo";
import { useQuery } from "react-query";
import { getTenant } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { TenantFormData } from "../../shared/types";


const TenantDetail: FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isError, isLoading } = useQuery<TenantFormData, Error>(
        "tenant",
        () => getTenant(id as string),
        {
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return (
            <div className="puffloader">
                <PuffLoader
                    color="#555"
                    aria-label="puff-loading"
                />
            </div>
        );
    }

    if (isError || !data) {
        return <div>Error while fetching tenant data</div>;
    }

    return (
        <div className="card-detail">
            <ImageCarousel images={data?.image || []} />
            <TenantInfo post={data} />
        </div>
    );
};

export default TenantDetail;