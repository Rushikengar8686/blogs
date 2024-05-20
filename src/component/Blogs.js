import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [show, setShow] = useState(false);
    const [getUserDetail, setGetUserDetail] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://onlinetestapi.gerasim.in/api/Blog/GetAllBlogs");
            setBlogs(response.data.data);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const getUserDetailById = async () => {
        try {
            const response = await axios.get("https://onlinetestapi.gerasim.in/api/Blog/GetAllUser");
            setGetUserDetail(response.data.data)
        } catch (error) {
            toast.error(error);

        }
    }

    const [formData, setFormData] = useState({
        BlogId: 0,
        BlogTitle: '',
        BlogCategoryId: 0,
        BannerImage: '',
        CreatedDate: new Date().toISOString(),
        ReadingTime: '',
        BlogDescription: '',
        BlogTags: '',
        AttachmentUrl: '',
        UserId: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();
        try {
            await axios.post('https://onlinetestapi.gerasim.in/api/Blog/createBlog', formData);
            toast.success('Blog added successfully!');
            fetchData();
            handleClose();
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
            }, 0)
        }
    };

    useEffect(() => {
        fetchData();
        getUserDetailById();

    }, []);

    return (
        <div>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-1"></div>
                    <div className="col-md-12">
                        <div className="card bg-light">
                            <div className="card-header bg-info">
                                <div className="row mt-2">
                                    <div className="col-md-10 text-center">
                                        <h4 className='text-start'>Blogs</h4>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <button className="btn btn-success m-1 text-right" onClick={handleShow}>Add Blog</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {blogs.map(blog => (
                                        <div className="col-lg-4 col-md-6 mb-4" key={blog.blogId}>
                                            <div className="card h-100">
                                                <img src={blog.bannerImage} className="card-img-top" style={{ height: "400px" }} alt={blog.blogTitle} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{blog.blogTitle}</h5>
                                                    <p className="card-text">{blog.blogDescription}</p>
                                                    <div className="blog-meta mb-2">
                                                        <span className="badge bg-info me-2">{blog.readingTime}</span>
                                                        <span className="badge bg-primary">{blog.blogTags}</span>
                                                    </div>
                                                    <a href={blog.attachmentUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More</a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Blog</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Blog Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="BlogTitle"
                                    value={formData.BlogTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Blog Category ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="BlogCategoryId"
                                    value={formData.BlogCategoryId}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Banner Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="BannerImage"
                                    value={formData.BannerImage}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Reading Time</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ReadingTime"
                                    value={formData.ReadingTime}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Blog Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="BlogDescription"
                                    value={formData.BlogDescription}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Blog Tags</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="BlogTags"
                                    value={formData.BlogTags}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>User Name</Form.Label>
                                <select name="" id="" className='form-select'>
                                    {getUserDetail && Array.isArray(getUserDetail) ? (
                                        getUserDetail.map((userIdDetail, index) => (
                                            <option key={index} value={userIdDetail.userId}>
                                                {userIdDetail.emailId}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">No users available</option>
                                    )}
                                </select>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Attachment URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="AttachmentUrl"
                                    value={formData.AttachmentUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Blogs;
