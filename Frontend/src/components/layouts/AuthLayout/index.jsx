import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLocation } from "../../../states/modules/app";
import LazyLoading from "components/UI/LazyLoading";

const banner =
	"https://courses.funix.edu.vn/asset-v1:FUNiX+BUS101x_02_VN+2020_T1+type@asset+block@people-working-conference-photo-illustration-260nw-210599638.jpg";

AuthLayout.propTypes = {
	title: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
	title: "",
};

function AuthLayout(props) {
	const { children, title, path } = props;
	const location = useSelector((state) => state.app.location);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (location.pathName !== location.prevPathName) {
			dispatch(
				setLocation({
					pathName: location.pathName,
					payload: location.payload,
					prevPathName: location.pathName,
				})
			);
			navigate(location.pathName);
		}
	}, [location, navigate, dispatch]);

	return (
		<div className={styles.layoutAuthWrap}>
			<div className={styles.mainWrap}>
				<div className={styles.form}>
					{path === "login" && (
						<>
							<LazyLoading>{children}</LazyLoading>
							<div className={styles.bannerWrap}>
								<div className={styles.banner}>
									<img src={banner} alt="banner" />
								</div>
								<div className={styles.bannerContent}>
									<h3 className={styles.authSlogan}>
										Connecting Visionaries, Building Futures
									</h3>
									<p className={styles.authDescription}>
										OpenNezt is a platform that connects founders with
										talented individuals, enabling easy collaboration
										to build strong teams and bring ideas to life.
									</p>
								</div>
							</div>
						</>
					)}
					{path === "register" && (
						<>
							<div className={styles.bannerWrap}>
								<div className={styles.banner}>
									<img src={banner} alt="banner" />
								</div>
								<div className={styles.bannerContent}>
									<h3 className={styles.authSlogan}>
										Connecting Visionaries, Building Futures
									</h3>
									<p className={styles.authDescription}>
										OpenNezt is a platform that connects founders with
										talented individuals, enabling easy collaboration
										to build strong teams and bring ideas to life.
									</p>
								</div>
							</div>
							<LazyLoading>{children}</LazyLoading>
						</>
					)}
					{path === "forgot-password" && (
						<>
							<LazyLoading>{children}</LazyLoading>
							<div className={styles.bannerWrap}>
								<div className={styles.banner}>
									<img src={banner} alt="banner" />
								</div>
								<div className={styles.bannerContent}>
									<h3 className={styles.authSlogan}>
										Connecting Visionaries, Building Futures
									</h3>
									<p className={styles.authDescription}>
										OpenNezt is a platform that connects founders with
										talented individuals, enabling easy collaboration
										to build strong teams and bring ideas to life.
									</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default AuthLayout;
