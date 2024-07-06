import * as yup from "yup";
import { VALIDATION_STRINGS } from "../messages/appMessages";
import { renderToString } from "react-dom/server";
import useNotifications from "../utils/useNotifications";
import { CreatePostDTO, PostDTO } from "../classes/appClasses";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required(VALIDATION_STRINGS.titleRequired)
    .min(2, VALIDATION_STRINGS.titleMinLength)
    .max(25, VALIDATION_STRINGS.titleMaxLength),
  content: yup
    .string()
    .required(VALIDATION_STRINGS.contentRequired)
    .min(2, VALIDATION_STRINGS.titleMinLength)
    .min(50, VALIDATION_STRINGS.contentMaxLength),
});

const validatePost = (post: CreatePostDTO | PostDTO) => {
  try {
    validationSchema.validateSync(post, { abortEarly: false });
    return true;
  } catch (error) {
    const validationError = error as yup.ValidationError;
    const errorMessages = validationError.inner.map((e) => (
      <li key={e.path} className="border-0 text-start">
        {e.message}
      </li>
    ));
    const errorMessage = renderToString(<ul>{errorMessages}</ul>);
    useNotifications(VALIDATION_STRINGS.validationError, errorMessage, "error");
    return false;
  }
};

export default validatePost;