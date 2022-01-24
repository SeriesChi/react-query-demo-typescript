import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface DependentQueriesProps {
	email: string;
}

type UserProps = {
	id: string;
	designationId: string;
};

type DesignationProps = {
	id: string;
	skills: string[];
};

const fetchUsersData = ({ email }: DependentQueriesProps) => {
	return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchDesignationData = (designationId: string) => {
	let result = axios.get(
		`http://localhost:4000/designation/${designationId}`
	);
	console.log(result);
	return result;
};

export const DependentQueries = (email: DependentQueriesProps) => {
	const [design, setDesign] = useState<DesignationProps | null>(null);
	const {
		isLoading: userLoading,
		data: user,
		isError: userIsError,
		error: userError,
	} = useQuery(["user", email], () => fetchUsersData(email));

	const designationId = user?.data.designationId;

	const {
		isLoading: designationLoading,
		data: desig,
		isError: designationIsError,
		error: designationError,
	} = useQuery("designation", () => fetchDesignationData(designationId), {
		enabled: !!designationId,
	});

	useEffect(() => {
		setDesign(desig?.data);
	}, [desig]);

	if (userLoading) {
		return <h2>User Loading...</h2>;
	}

	if (userIsError) {
		return <h2>{userError as Error}</h2>;
	}
	console.log(design, "design");

	return (
		<div>
			<h2>Dependent Queries</h2>
			<div>Email - {email.email}</div>
			{designationLoading ? (
				<h4>Designation Loading...</h4>
			) : designationIsError ? (
				<h4>{designationError as Error}</h4>
			) : design ? (
				design.skills.map((item, index) => <div>{item}</div>)
			) : (
				""
			)}
		</div>
	);
};
