import React, { useEffect } from 'react'
import _ from 'lodash'
// import { isValidate } from "../../../../../utils/validate";
// import { handleCheckValidateConfirm } from "../../../../../utils/helper";
import ModalGeneral from '../../../../../components/UI/Modal/ModalGeneral'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

ModalCreateOrUpdate.propTypes = {
    isModalOpen: PropTypes.bool,
    configModal: PropTypes.object,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    CreateOrUpdateElement: PropTypes.func,
    handleReloadData: PropTypes.func,
    visibleModalCreateOrUpdate: PropTypes.bool,
    setVisibleModalCreateOrUpdate: PropTypes.func,
}

ModalCreateOrUpdate.defaultProps = {
    isModalOpen: false,
    textBtnConfirm: 'OK',
    configModal: {
        title: 'Title',
        type: 'CREATE',
    },
}

function ModalCreateOrUpdate({
    CreateOrUpdateElement,
    configModal,
    handleReloadData,
    visibleModalCreateOrUpdate,
    setVisibleModalCreateOrUpdate,
}) {
    const dispatch = useDispatch()

    useEffect(() => {
        handleReloadData()
    }, [visibleModalCreateOrUpdate, handleReloadData])

    // const errorCreateOrUpdateEmployee = useSelector(
    // 	(state) => state.employee.errorCreateOrUpdateEmployee
    // );

    // useEffect(() => {
    // 	dispatch(
    // 		setErrorCreateOrUpdateEmployee({
    // 			name: "",
    // 			email: "",
    // 			phone: "",
    // 			password: "",
    // 			confirmPassword: "",
    // 		})
    // 	);
    // }, [dataCreateOrUpdate, dispatch]);

    // const validateBlur = (type) => {
    // 	let validate = isValidate(
    // 		dataCreateOrUpdate,
    // 		type,
    // 		errorCreateOrUpdateEmployee
    // 	);
    // 	dispatch(setErrorCreateOrUpdateEmployee(validate.error));
    // 	return validate.isError;
    // };

    return (
        <ModalGeneral
            isModalOpen={visibleModalCreateOrUpdate}
            onClose={() => dispatch(setVisibleModalCreateOrUpdate(false))}
            configModal={configModal}
        >
            {CreateOrUpdateElement()}
        </ModalGeneral>
    )
}

export default ModalCreateOrUpdate
